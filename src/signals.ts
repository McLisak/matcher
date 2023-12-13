import { signal, computed, effect } from '@preact/signals-react';
import { MatchResult, matcherAsync } from '../lib/matcher';

const SS_KEY = 'm-list';
export const MIN_LIST_LEN = 3;
/**
 * Defines the delay before going in loading state.
 * Things which happen quicker does not really
 * need to feedback a loading state for the user.
 */
const LOADING_STATE_DELAY = 150;

function getStoredList() {
  const storedList = window.sessionStorage.getItem(SS_KEY);
  if (storedList) {
    return JSON.parse(storedList) as string[];
  }
  return [] as string[];
}
export const list = signal(getStoredList());
export const canMatch = computed(() => list.value.length >= MIN_LIST_LEN);

effect(() => {
  window.sessionStorage.setItem(SS_KEY, JSON.stringify(list.value));
});

export const result = signal<MatchResult<string> | null>(null);
export const resultOpen = signal(false);
export const resultLoading = signal(false);

let resultLoadingTimeout: number | null = null;

function clearResultLoadingTimeout() {
  if (resultLoadingTimeout) {
    window.clearTimeout(resultLoadingTimeout);
    resultLoadingTimeout = null;
  }
}

/**
 * Creates the result.
 * The complexity of finding result grows with list length.
 * Because of that and due to potential render block
 * caused by multiple synchronous array shuffles
 * there is intentional microtask spawned.
 */
export async function makeResult() {
  const currentList = list.value;
  if (currentList.length < MIN_LIST_LEN) {
    return;
  }
  setResultLoading();

  result.value = await matcherAsync(currentList);
  clearResultLoadingTimeout();
  resultLoading.value = false;
  resultOpen.value = true;
}

export function setResultLoading() {
  clearResultLoadingTimeout();
  resultLoadingTimeout = setTimeout(
    () => (resultLoading.value = true),
    LOADING_STATE_DELAY,
  );
}

export function closeResult() {
  resultOpen.value = false;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doBubbleSort(array, 0, 1, array.length, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the vales that are being compared;
    // they get pushed once to change their color.
    animations.push([i, j]);
    // These are the values that are being compared;
    // they get pushed a second time to revert colors.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // The values get overwritten at index k in the
      // original array with the value at index i
      // in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // The values get overwritten at index k in the
      // original array with the value at index j
      // in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // The values that we're comparing; we push them
    // once to change their color.
    animations.push([i, i]);
    // The values that we're comparing; we push them
    // a second time to revert their color.
    animations.push([i, i]);
    // The values are overwritten at index k in the
    // original array with the value at index i in
    // the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // The values that are being compared; are pushed
    // once to change their color.
    animations.push([j, j]);
    // The values that are being compared; are pushed
    // for the second time to revert their color.
    animations.push([j, j]);
    // The values that overwrite at index k in the
    // original array with the value at index i in
    // the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function doBubbleSort(array, pointerOne, pointerTwo, max, animations){
  var isSorted = false;
  while(!isSorted){
    isSorted = true;
    pointerOne = 0;
    pointerTwo = 1;
    while(pointerTwo < max){
      // These are the vales that are being compared;
      // they get pushed once to change their color.
      animations.push([pointerOne, pointerTwo]);
      // These are the values that are being compared;
      // they get pushed a second time to revert colors.
      animations.push([pointerOne, pointerTwo]);
      if(array[pointerOne] > array[pointerTwo]){
        // The values get overwritten at index pointerOne in the
        // array with the value at index pointerTwo.
        animations.push([pointerOne, array[pointerTwo], pointerTwo, array[pointerOne]]);
        var numOne = array[pointerOne];
        array[pointerOne] = array[pointerTwo];
        array[pointerTwo] = numOne;
        isSorted = false;
      } else {
        // The values get overwritten at index pointerOne in the
        // array with the value at index pointerOne.
        // The values get overwritten at index pointerTwo in the
        // array with the value at index pointerTwo.
        animations.push([pointerOne, array[pointerOne], pointerTwo, array[pointerTwo]]);
      }
      pointerOne++;
      pointerTwo++;
    }
    max--;
  }
  // console.log(animations);
}

/* eslint-disable no-unused-vars */
import ResizeObserver from 'resize-observer-polyfill'

/**
 * Takes in callback and returns ResizeObserver
 * @param callback Function to run when ResiveObserver catches observed element size change  
 */
export const createResizeObserver = (callback: () => void): ResizeObserver => {
  // eslint-disable-next-line no-undef
  return new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver): void => {
    callback()
  })
}
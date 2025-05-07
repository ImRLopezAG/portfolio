import type * as React from 'react';

export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    }
  };
}

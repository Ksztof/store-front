declare module 'redux-persist/lib/storage' {
    const storage: any;
    export default storage;
  }
  

  // src/redux-persist.d.ts
declare module 'redux-persist/es/persistReducer' {
  import { Reducer } from 'redux';
  import { PersistConfig } from 'redux-persist/es/types';

  export default function persistReducer<S, A>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A>
  ): Reducer<S, A>;
}

declare module 'redux-persist/es/storage' {
  const storage: Storage;
  export default storage;
}

declare module 'redux-persist/es/persistStore' {
  import { Store } from 'redux';
  import { PersistorOptions, Persistor } from 'redux-persist/es/types';

  export default function persistStore(
    store: Store,
    options?: PersistorOptions,
    callback?: () => void
  ): Persistor;
}

declare module 'redux-persist/es/types' {
  export interface Persistor {
    purge(): Promise<void>;
    flush(): Promise<void>;
  }

  export interface PersistorOptions {
    enhancer?: (next: (reducer: any, initialState: any) => any) => any;
  }

  export interface PersistConfig<S> {
    key: string;
    version?: number;
    storage: Storage;
    whitelist?: (keyof S)[];
    blacklist?: (keyof S)[];
    transforms?: any[];
    throttle?: number;
    debug?: boolean;
    migrate?: (state: S) => Promise<S>;
    stateReconciler?: false | ((inboundState: S, originalState: S, reducedState: S, config: PersistConfig<S>) => S);
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;
type ServiceFactory<T> = () => T;

export class DIContainer {
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  register<T>(name: string, definition: Constructor<T> | ServiceFactory<T>, singleton = false): void {
    if (singleton) {
      this.singletons.set(name, definition);
    } else {
      this.services.set(name, definition);
    }
  }

  resolve<T>(name: string): T {
    const singletonDefinition = this.singletons.get(name);
    if (singletonDefinition) {
      if (!this.services.has(name)) {
        const instance = typeof singletonDefinition === 'function' 
          ? new (singletonDefinition as Constructor<T>)()
          : (singletonDefinition as ServiceFactory<T>)();
        this.services.set(name, instance);
      }
      return this.services.get(name);
    }

    const serviceDefinition = this.services.get(name);
    if (!serviceDefinition) {
      throw new Error(`Service ${name} not found`);
    }

    return typeof serviceDefinition === 'function'
      ? new (serviceDefinition as Constructor<T>)()
      : (serviceDefinition as ServiceFactory<T>)();
  }

  clear(): void {
    this.services.clear();
    this.singletons.clear();
  }
}

export const container = new DIContainer();
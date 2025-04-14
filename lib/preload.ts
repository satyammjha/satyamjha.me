export const preload = async (components: string[]) => {
    if (typeof window === 'undefined') return;
  
    await Promise.all(
      components.map(component => {
        return new Promise<void>((resolve, reject) => {
          const element = document.createElement('link');
          element.rel = 'preload';
          element.as = 'script';
          element.href = `/_next/static/chunks/${component}.js`;
          element.onload = () => resolve();
          element.onerror = reject;
          document.head.appendChild(element);
        });
      })
    );
  };
import { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren) {
    return <div className={`main-section antialiased relative font-nunito text-sm font-normal`}>{children}</div>;
}

export default App;

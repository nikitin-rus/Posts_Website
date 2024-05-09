export function Page({ children }: { children: React.ReactNode }) {
    return (
        <main className="page">
            <div className="page__content">
                {children}
            </div>
        </main>
    );
} 
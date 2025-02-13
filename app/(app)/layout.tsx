import PageWrapper from "@/components/wrapper/page-wrapper";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageWrapper>
            {children}
        </PageWrapper>
    )
}
export default AppLayout;
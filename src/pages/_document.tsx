
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentProps {
    pageProps: any;
}

class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };
    }
}

export default MyDocument;

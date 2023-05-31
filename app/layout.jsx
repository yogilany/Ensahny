import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Footer from '@components/Footer';

export const metadata = {
    title: "إنصحني",
    description: "propmtoia description aaaaaaa",
}


const RootLayout = ({children}) => {
  return (
    <html lang="ar">
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'>

                </div>
            </div>

            <main className='app'>
                <Nav />
                {children}
                <Footer />
                
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout 

import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Forms from './component/Forms';



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Navbar />
      <Forms />
      <Footer />

    </main>
  );
}

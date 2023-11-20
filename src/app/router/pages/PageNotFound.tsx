import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="m-8 text-center font-mono text-lg text-slate-50">
        Page Not Found! Error: 404
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;

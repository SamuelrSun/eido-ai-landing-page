import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/landing/Header";
import { Hero, HowItWorks, Features, Testimonials, FAQ, FinalCTA, Footer } from "./components/landing/Sections";
import { Toaster } from "./components/ui/toaster";

// The app will now default to its own relative /api path
const API = "/api";

function App() {
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        // This call will likely fail now unless you run the backend locally, which is expected.
        const response = await axios.get(`${API}/`);
        console.log(response.data.message);
      } catch (e) {
        console.error(e, `errored out requesting /api`);
      }
    };
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
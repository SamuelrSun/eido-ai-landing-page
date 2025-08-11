import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/landing/Header";
import { Hero, HowItWorks, Features, Testimonials, FAQ, FinalCTA, Footer } from "./components/landing/Sections";
import { Toaster } from "./components/ui/toaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

function App() {
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log(response.data.message);
      } catch (e) {
        console.error(e, `errored out requesting / api`);
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
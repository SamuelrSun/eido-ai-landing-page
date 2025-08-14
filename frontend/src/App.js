import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/landing/Header";
import Hero from "./components/landing/sections/Hero";
import HowItWorks from "./components/landing/sections/HowItWorks";
import Features from "./components/landing/sections/Features";
import Testimonials from "./components/landing/sections/Testimonials";
import FinalCTA from "./components/landing/sections/FinalCTA";
import Footer from "./components/landing/sections/Footer";
import { Toaster } from "./components/ui/toaster";

const API = "/api";

function App() {
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log(response.data.message);
      } catch (e) {
        console.error(e, `errored out requesting /api`);
      }
    };
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
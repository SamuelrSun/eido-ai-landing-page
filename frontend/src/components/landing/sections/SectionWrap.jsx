import React from "react";

export default function SectionWrap({ id, children, className = "" }) {
    return (
        <section id={id} className={`mx-auto max-w-[1280px] px-6 md:px-10 ${className}`}>
            {children}
        </section>
    );
}
"use client";
import Header from "@/components/Header";
import ReviewsSection from "@/components/ReviewsSection";
import SiteFooter from "@/components/SiteFooter";

export default function ReviewsPage() {
  return (
    <main>
      <div className="pt-[72px] sm:pt-[88px] bg-[var(--c-body)]">
        <Header alwaysFrosted />
        <ReviewsSection />
        <SiteFooter />
      </div>
    </main>
  );
}

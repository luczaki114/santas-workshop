import Link from 'next/link'
import { ListPlus, Share2, Gift, LayoutDashboard, Sparkles, Snowflake, Check } from "lucide-react";

const HOW_IT_WORKS_STEPS = [
  { 
    icon: <ListPlus className="w-6 h-6 text-red-500" />, 
    title: "Create a Wishlist", 
    desc: "Parents generate a unique wishlist link." 
  },
  { 
    icon: <Share2 className="w-6 h-6 text-red-500" />, 
    title: "Share with Your Child", 
    desc: "Send them their personal wishlist page." 
  },
  { 
    icon: <Gift className="w-6 h-6 text-red-500" />, 
    title: "Let the Magic Happen", 
    desc: "Kids add their dream gifts via text or links." 
  },
  { 
    icon: <LayoutDashboard className="w-6 h-6 text-red-500" />, 
    title: "Track in Your Dashboard", 
    desc: "Easily view and manage all wishlists in one place." 
  },
];

const FEATURES = [
  { title: "Easy to Use", desc: "No more scattered notes or forgotten wishes!" },
  { title: "Customizable & Private", desc: "Every wishlist is unique and secure." },
  { title: "Real-Time Updates", desc: "See your child's wishes as they're added." },
  { title: "Perfect for Family Sharing", desc: "Grandparents & relatives can see what's on their list!" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen prose max-w-none">
      {/* Hero Section */}
      <div className="hero min-h-[60vh]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-primary">
              The Magic of Christmas, One Wish at a Time!
            </h1>
            <p className="py-6 text-xl">
              A Simple & Fun Way to Collect Your Child&apos;s Christmas Wishes
            </p>
            <p className="text-base-content/70">
              The holiday season is full of wonder, and with North Pole Express, you can make Christmas even more magical! 
              Create a personalized wishlist for your child with a single click and share a custom link where they can add their most wished-for gifts. 
              No more guessing games&mdash;just holiday cheer, made simple!
            </p>
            <Link href="/dashboard" className="btn btn-primary btn-lg mt-8">
              Create Your Free Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-base-200 rounded-box">
        <div className="container p-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <Snowflake className="w-8 h-8 inline-block mb-1" /> How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-2xl font-bold mb-2">{item.icon}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-100">
        <div className="container p-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <Sparkles className="w-8 h-8 inline-block mb-1" /> Why Parents Love North Pole Express
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="card bg-base-200 hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h3 className="card-title">

                    <Check className="w-5 h-5 text-green-500" /> {feature.title}
                  </h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-16 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Wishlist Now & Make This Christmas Unforgettable!
        </h2>
        <Link href="/dashboard" className="btn btn-primary btn-lg">
          Create Your Free Wishlist
        </Link>
      </div>
    </main>
  )
}

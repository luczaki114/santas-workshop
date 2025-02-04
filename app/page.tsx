import Link from 'next/link'

const HOW_IT_WORKS_STEPS = [
  { step: "1️⃣", title: "Create a Wishlist", desc: "Parents generate a unique wishlist link." },
  { step: "2️⃣", title: "Share with Your Child", desc: "Send them their personal wishlist page." },
  { step: "3️⃣", title: "Let the Magic Happen", desc: "Kids add their dream gifts via text or links." },
  { step: "4️⃣", title: "Track in Your Dashboard", desc: "Easily view and manage all wishlists in one place." },
];

const FEATURES = [
  { title: "Easy to Use", desc: "No more scattered notes or forgotten wishes!" },
  { title: "Customizable & Private", desc: "Every wishlist is unique and secure." },
  { title: "Real-Time Updates", desc: "See your child's wishes as they're added." },
  { title: "Perfect for Family Sharing", desc: "Grandparents & relatives can see what's on their list!" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-primary">
            The Magic of Christmas, One Wish at a Time!
            </h1>
            <p className="py-6 text-lg">
              A Simple & Fun Way to Collect Your Child&apos;s Christmas Wishes
            </p>
            <p className="mb-8 text-base-content/80">
              The holiday season is full of wonder, and with North Pole Express, you can make Christmas even more magical! 
              Create a personalized wishlist for your child with a single click and share a custom link where they can add their most wished-for gifts. 
              No more guessing games&mdash;just holiday cheer, made simple!
            </p>
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Create Your Free Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">🎅 How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <h3 className="text-2xl font-bold mb-2">{item.step}</h3>
                  <h4 className="card-title">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">✨ Why Parents Love North Pole Express</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {FEATURES.map((feature, index) => (
              <div key={index} className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">✔ {feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Start Your Wishlist Now & Make This Christmas Unforgettable!
        </h2>
        <Link href="/dashboard" className="btn btn-primary btn-lg">
          Create Your Free Wishlist
        </Link>
      </div>

    </main>
  )
}

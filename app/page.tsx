import Header from '@/components/Header'
import { supabase } from '@/lib/supabaseClient'
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Simple starter query - proves the connection to Supabase works.
  // Om: replace this with real product fetching once you're building
  // the actual Popular Products section.
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name')
    .limit(9)

  return (
    <main>
      <Header />

      <section className="bg-kmart-navy px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">
            Fresh Essentials <span className="text-kmart-red">Right at Your Doorstep</span>
          </h1>
          <p className="mt-3 text-lg text-gray-200">
            Groceries. Daily essentials. Happier homes.
          </p>
          <button className="mt-6 rounded-md bg-kmart-red px-6 py-3 font-medium">
            Shop Now →
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-4 text-xl font-bold text-kmart-navy">Shop by Category</h2>

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            Could not connect to Supabase yet: {error.message}. This is expected
            until categories are added to the database — the connection itself
            is what this page is testing.
          </p>
        )}

        {!error && (!categories || categories.length === 0) && (
          <p className="text-sm text-gray-500">
            Connected to Supabase successfully — no categories added yet.
          </p>
        )}

        {categories && categories.length > 0 && (
          <div className="grid grid-cols-3 gap-4 md:grid-cols-9">
            {categories.map((c) => (
              <div
                key={c.id}
                className="rounded-full bg-kmart-lightblue px-3 py-6 text-center text-sm font-medium text-kmart-navy"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

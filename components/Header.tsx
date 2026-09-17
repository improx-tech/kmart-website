export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <div className="text-2xl font-bold">
          <span className="text-kmart-red">K</span>
          <span className="text-kmart-navy">MART</span>
        </div>
        <div className="hidden text-sm text-gray-500 md:block">
          Deliver to <span className="font-medium text-kmart-navy">Select address</span>
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-kmart-navy"
          />
        </div>
        <button className="rounded-md bg-kmart-red px-4 py-2 text-sm font-medium text-white">
          Cart
        </button>
      </div>
    </header>
  )
}

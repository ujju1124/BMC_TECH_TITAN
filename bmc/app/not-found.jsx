import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white p-10 font-serif">
      <div className="text-center">
        <div
          className="w-full h-[400px] bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        />
        <div className="mt-[-50px] text-gray-700">
          <h3 className="text-3xl font-semibold">Looks like you're lost</h3>
          <p className="text-lg mt-2">
            The page you are looking for is not available!
          </p>
          <Link
            href="/"
            className="mt-5 inline-block px-6 py-3 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

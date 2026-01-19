import Link from "next/link";

function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4 py-22'>
      <h1 className='text-3xl font-semibold'>
        This shipment could not be found :(
      </h1>
      <Link
        href='/shipments'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        Back to all shipments
      </Link>
    </main>
  );
}

export default NotFound;

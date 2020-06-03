// import Head from "next/head";

export default function Home({ message }) {
  return (
    <div className="container">
      <h1>{message}</h1>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // const res = await fetch("https://.../posts");
  // const message = await res.json();
  const message = "Foop";

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      message,
    },
  };
}

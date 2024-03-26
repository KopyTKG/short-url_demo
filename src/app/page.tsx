'use client'
import {useRef} from 'react';
export default function Home() {
const inputRef = useRef<HTMLInputElement>(null);
async function Submit() {
  //regex pattern
  const _pattern = "^(https?:\\/\\/)[\\da-z\\.-]+\\.[a-z]{2,}([\\/\\w .-]*)(:[\\w]+)?(\\?[\\w=&]+)?(#\\w+)?\\/?$";
  //initializing regex
  const _regex = new RegExp(_pattern);

  // get value of input field
  const urlInput = inputRef.current?.value || null
  if (!urlInput) return;

  if (!_regex.test(urlInput)) {
    alert("Invalid URL");
    return;
  } else {
    // post request header
    const headers = {
      method: 'POST',
      headers: {
       accept: 'application/json',
      },
      body: JSON.stringify({url: urlInput}),
    }
    // Fetch call with headers
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/url', headers)
    // Check if response code isn't 200
    if (!response.ok) {
      alert('Failed to fetch data')
      return
     }
    // json data from api
    const data = await response.json()
    alert(process.env.NEXT_PUBLIC_BASE_URL + "/" + data.id)
    return;
  }
}
return (
  <main className="w-full h-[95vh] flex justify-center items-center">
    <div className=" flex flex-col items-center w-1/4 h-fit outline-1 outline outline-gray-500 bg-gray-900 rounded-lg gap-10 py-5 px-3">
      <h1 className="text-3xl text-white font-bold" > ShortURL </h1>
      <input ref={inputRef} placeholder="Enter URL to shorten" className="w-full h-10 px-3 rounded-lg bg-slate-600 text-white" />
      <button className="text-xl bg-blue-400 rounded-xl px-4 py-2 text-black hover:bg-blue-700 hover:text-white ease-in-out duration-300" onClick={() => Submit()}>
        Create URL
      </button>
    </div>
  </main>
);
}
'use client'
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  async function GetUrl() {
    const headers = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/url?id=" + params.slug,
      headers
    );

    if (!response.ok) {
        window.location.replace(process.env.NEXT_PUBLIC_BASE_URL || '')
    }

    const data = await response.json();
    window.location.replace(data.url);
    return;
  }
  useEffect(() => {GetUrl()}, [GetUrl]);

  return <h1>Dynamic page :{params.slug}</h1>;
}
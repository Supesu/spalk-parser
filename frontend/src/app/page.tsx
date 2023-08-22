"use client"
import React, { useRef } from 'react';
import axios from 'axios';

function Page() {
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadFile = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (fileInput.current) {
      formData.append('file', (fileInput.current as any).files[0]);
    }

    axios.post('http://localhost:3030/upload', formData)
      .then((data) => alert(data.data))
      .catch((error) => alert(error));
  };

  return (
    <form onSubmit={uploadFile}>
      <input type="file" ref={fileInput} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Page;
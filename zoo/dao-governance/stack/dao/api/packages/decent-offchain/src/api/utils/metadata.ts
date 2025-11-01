export async function fetchMetadata(cid: string) {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
  const data = (await response.json()) as { title: string; description: string };
  return data;
}

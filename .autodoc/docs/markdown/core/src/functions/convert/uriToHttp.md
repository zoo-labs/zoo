[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/convert/uriToHttp.ts)

The `uriToHttp` function takes a URI as input and returns an array of fetch-able http(s) URLs for the same content. The function supports four protocols: http, https, ipfs, and ipns. 

For http and https protocols, the function simply returns the input URI as a single-element array. For ipfs and ipns protocols, the function returns two URLs: one for the cloudflare-ipfs.com gateway and one for the ipfs.io gateway. 

The function first extracts the protocol from the input URI using the `split` method and converts it to lowercase. It then uses a `switch` statement to handle each protocol case. 

For http protocol, the function constructs two URLs: one with https protocol and the same path as the input URI (with the first four characters removed), and one with http protocol and the same path as the input URI. These URLs are returned as a two-element array. 

For ipfs and ipns protocols, the function extracts the hash or name from the URI using a regular expression and constructs two URLs for each protocol using the extracted hash or name. These URLs are returned as a two-element array. 

This function can be used in the larger project to convert URIs to fetch-able http(s) URLs for content stored on ipfs or ipns. For example, if the project needs to fetch content from ipfs, it can use this function to convert the ipfs URI to http(s) URLs and then use these URLs to fetch the content. 

Example usage:

```
const uri = 'ipfs:QmXyZabc123'
const httpUrls = uriToHttp(uri)
console.log(httpUrls) // ['https://cloudflare-ipfs.com/ipfs/QmXyZabc123/', 'https://ipfs.io/ipfs/QmXyZabc123/']
```
## Questions: 
 1. What is the purpose of this function?
    
    This function takes a URI and returns an array of fetch-able http(s) URLs for the same content.

2. What protocols does this function support?
    
    This function supports ipfs, ipns, http, and https protocols.

3. What is the purpose of the regular expressions used in this function?
    
    The regular expressions are used to extract the hash or name from the ipfs or ipns URI, respectively.
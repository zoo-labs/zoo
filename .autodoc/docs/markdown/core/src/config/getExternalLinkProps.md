[View code on GitHub](zoo-labs/zoo/blob/master/core/src/config/getExternalLinkProps.ts)

The code in this file exports a function called `getExternalLinkProps` which returns an object with two properties: `target` and `rel`. The purpose of this function is to provide consistent properties for external links in the larger project. 

The `target` property is set to `_blank`, which means that when a user clicks on an external link, it will open in a new tab or window. This is a common practice to prevent users from navigating away from the current page. 

The `rel` property is set to `'noreferrer noopener'`. The `noreferrer` value tells the browser not to send the referrer information to the linked page, which can help protect user privacy. The `noopener` value prevents the linked page from accessing the window object of the page that opened it, which can help prevent malicious attacks. 

By using this function to set the properties of external links throughout the project, the codebase can maintain consistency and ensure that all external links have the same behavior and security measures. 

Here is an example of how this function might be used in a React component:

```
import React from 'react';
import getExternalLinkProps from './getExternalLinkProps';

const MyComponent = () => {
  return (
    <div>
      <a href="https://example.com" {...getExternalLinkProps()}>
        Click me!
      </a>
    </div>
  );
};

export default MyComponent;
```

In this example, the `getExternalLinkProps` function is used to spread the `target` and `rel` properties onto the `a` element. This ensures that the link will open in a new tab and have the appropriate security measures applied.
## Questions: 
 1. What does the `getExternalLinkProps` function do?
   - The `getExternalLinkProps` function returns an object with two properties, `target` and `rel`, which are used for external links.

2. Why is the `target` property set to `_blank`?
   - The `target` property is set to `_blank` to open the link in a new tab or window, instead of replacing the current page.

3. What is the purpose of the `rel` property and why is it set to `noreferrer noopener`?
   - The `rel` property is used to specify the relationship between the current document and the linked document. `noreferrer` is used to prevent the browser from sending the referrer header, and `noopener` is used to prevent the new page from being able to access the window object of the previous page. This helps to improve security and privacy.
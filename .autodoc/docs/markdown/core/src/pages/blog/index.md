[View code on GitHub](zoo-labs/zoo/blob/master/core/src/pages/blog/index.tsx)

The `Blog` component is responsible for rendering the blog page of the Zoo project. It imports several dependencies such as `React`, `useState`, `useEffect`, `Image`, and `Link`. It also imports two custom components, `Article` and `BlogCards`, and an animation function, `fadeInOnScroll`.

The component defines two arrays, `news` and `guides`, which contain objects representing blog posts. Each object has properties such as `name`, `image`, `link`, `date`, `writtenBy`, and `isNew`. These arrays are then concatenated and sorted by date in descending order to create a new array called `all`.

The `Blog` component renders a hero section with a title and a description, followed by a section with two columns. The first column displays an image, while the second column displays a blog post with a title, a short description, and a link to read the full story. This section is followed by a tab section that allows the user to filter the blog posts by category. The categories are "All", "News", and "Zoo Guide". Finally, the component renders a section that displays the blog posts based on the selected category.

The `useEffect` hook is used to apply the `fadeInOnScroll` animation to the hero section when the component mounts.

Overall, the `Blog` component provides a user-friendly interface for browsing and reading blog posts related to the Zoo project. It allows users to filter posts by category and provides a visually appealing layout for displaying the posts. Below is an example of how the `Blog` component can be used in the larger project:

```jsx
import Blog from 'zoo/Blog';

function App() {
  return (
    <div>
      <Blog />
    </div>
  );
}
```
## Questions: 
 1. What is the purpose of the `Blog` component?
- The `Blog` component is responsible for rendering the Zoo blog page, which includes a hero section, tabs section, and articles map.

2. What is the significance of the `all` variable?
- The `all` variable is an array that contains all the articles from the `news` and `guides` arrays, sorted by date in descending order. It is used to display all articles when the "All" tab is selected.

3. What is the purpose of the `fadeInOnScroll` function?
- The `fadeInOnScroll` function is an animation function that fades in an element when it comes into view during scrolling. It is used to animate the hero section of the blog page.
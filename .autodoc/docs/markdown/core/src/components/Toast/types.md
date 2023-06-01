[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Toast/types.ts)

This code defines a set of interfaces and types related to displaying toast notifications in a web application. Toast notifications are small messages that appear on the screen to provide feedback or alerts to the user. 

The `types` object defines three different types of toast notifications: DANGER, WARNING, and INFO. These types are represented as strings that can be used to style the toast notification appropriately. 

The `Types` type is a union type that represents all possible values of the `types` object. This type is used to ensure that the `type` property of the `Toast` interface is always one of the valid types defined in the `types` object. 

The `ToastAction` interface defines the structure of an action that can be associated with a toast notification. This includes a `text` property that describes the action and a `url` property that specifies the URL to navigate to when the action is clicked. 

The `Toast` interface defines the structure of a toast notification. Each toast has an `id` property that uniquely identifies it, a `type` property that specifies the type of the toast (using one of the values from the `types` object), a `title` property that provides a short description of the toast, an optional `description` property that provides additional information, and an optional `action` property that specifies an action associated with the toast. 

The `ToastContainerProps` interface defines the properties that can be passed to a component that displays a collection of toast notifications. This includes an array of `toasts` to display, a `stackSpacing` property that specifies the spacing between stacked toasts, a `ttl` property that specifies the time-to-live (in milliseconds) for each toast, and an `onRemove` callback function that is called when a toast is dismissed. 

The `ToastProps` interface defines the properties that can be passed to a component that displays a single toast notification. This includes the `toast` object to display, the `onRemove` callback function, the `ttl` property, and a `style` property that can be used to apply custom styles to the toast. 

Overall, this code provides a set of interfaces and types that can be used to define and display toast notifications in a web application. By using these interfaces and types, developers can ensure that their toast notifications are consistent and easy to manage. 

Example usage:

```typescript
import { Toast, ToastContainerProps, ToastProps } from 'zoo';

const toasts: Toast[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Warning!',
    description: 'Something went wrong.',
    action: {
      text: 'Retry',
      url: '/retry',
    },
  },
  {
    id: '2',
    type: 'info',
    title: 'Information',
    description: 'Your changes have been saved.',
  },
];

function handleRemove(id: string) {
  // Remove the toast with the specified ID
}

function renderToast(toast: Toast) {
  return (
    <ToastProps
      toast={toast}
      onRemove={handleRemove}
      ttl={5000}
      style={{ backgroundColor: 'white' }}
    />
  );
}

function renderToastContainer() {
  return (
    <ToastContainerProps
      toasts={toasts}
      stackSpacing={10}
      ttl={5000}
      onRemove={handleRemove}
    >
      {toasts.map(renderToast)}
    </ToastContainerProps>
  );
}
```
## Questions: 
 1. What are the different types of toasts that can be displayed?
- The different types of toasts that can be displayed are DANGER, WARNING, and INFO.

2. What is the purpose of the `ToastContainerProps` interface?
- The `ToastContainerProps` interface is used to define the props that are passed to the `ToastContainer` component, including the array of `toasts`, `stackSpacing`, `ttl`, and `onRemove` function.

3. What is the relationship between `ToastProps` and `ToastContainerProps`?
- `ToastProps` extends `ToastContainerProps` and adds additional props specific to an individual toast, such as `toast`, `ttl`, and `style`.
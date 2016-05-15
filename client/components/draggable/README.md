Draggable
======

Creates a `div` element that can be dragged around using a mouse

## Usage

```jsx
<Draggable
    onDrag={ this.onBottomLeftDrag }
    onStop={ this.onDragStop }
    y={ bottom }
    x={ left } />
}
```

## Props

### `x`

The x position of the element

### `y`

The y position of the element

### `onDrag( x, y )`

A method invoked while the element is dragged around. Receives x and y coordinates

### `onStop()`

A method invoked after the dragging finishes

### `controlled`

If true, the position of the element is controlled by the `x` and `y` properties instead of internal state. The `onDrag` method should be used to update them

### `bounds`

An object of format `{ top: <number>, left: <number>, bottom: <number>, right: <number> }`. If provided, the draggable element cannot be dragged outside the defined bounds.

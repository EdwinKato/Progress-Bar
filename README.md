### Description

Display graphically the progress of a status. Displaying different styles: normal, striped or animated. Based on attribute indicate the colour can be set. The percentage is based on a integer of float value from 0 to 100

### Typical usage scenario

 * Show progress of a task
 * Show time left of ticket

### Features and limitations

If any limitation in rendering and animation, it is based Bootstrap (version 3.0.2 in Mendix 5.6)

Progress bars use CSS3 transitions and animations to achieve some of their effects. These features are not supported in Internet Explorer 9 and below or older versions of Firefox. Opera 12 does not support animations.

### Configuration  

Use the following settings:

 * Data source
    * **Progress attribute**: The attribute that contains the progress percentage.
    * **Type**: Render the type of progress bar: default, striped or animated.

 * Display
    * **Bootstrap Style**: Value of attribute should be: info, warning, danger, success. Alternatively use the 'Class bar' property to set the styling
    * **Width**: The width in pixels of the widget. if 0 it will be 100%
    * **Colour switch value**: The percentage at which the text colour goes from black to white.
    * **Description**: The text to put in the bar after the percentage value.

 * Behaviour
    * **Click MicroFlow**: If set, the MF will be called on click of the Progress Bar

 * Common
    * **Class**: CSS class of the widget
    * **Class bar**: CSS class of the bar

### Bugs & Questions

Please address questions in the Mendix Forum topic:
[https://mxforum.mendix.com/questions/6800/App-Store-Widget-Bootrap-Progress-Bar-10](https://mxforum.mendix.com/questions/6800/App-Store-Widget-Bootrap-Progress-Bar-10)

Bugs and issue can reported via git hub issue tracker:
[https://github.com/Andries-Smit/Bootstrap-Progress-Bar/issues] (https://github.com/Andries-Smit/Bootstrap-Progress-Bar/issues)

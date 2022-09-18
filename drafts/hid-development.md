--- 
title: HID Driver Development - DRAFT
link: hid-driver-development
layout: post.njk 
date: 2022-09-18
canonical_irl: http://www.vineeth.io/blog/hid-driver-development
meta_description: An overview of the different processes to making a custom HID device 
tags: ['post'] 
---

<!-- Excerpt Start -->
When I was in college I worked on a lot of projects where I had to make custom
devices to interact with programs I wrote on a pc. These usually took the form
of different types of hardware controllers like a retro arcade controller from
the game tron. 

There wasn't really a super straight forward guide I was able to use when developing
these devices so I wanted to record more about the process I would have to follow. 
<!-- Excerpt End -->


## HID Devices

An __HID Device__ stands for *Human Interface Device* and is any piece of hardware
you can use to interact with a computer. They use a predefined protocol
for two way communications with a computer over a Universal Serial Bus (USB). The smallest
unit of communication with HID devices are known as __reports__ and the structure of 
a devices reports are defined using a __report descriptor__. 

### Reports

HID drivers work by constantly sending a report to the host device with the state of 
the inputs in the device. The structure of this report has to be very explicitly defined
with a descriptor. Below is an example descriptor that I used to make a gamepad
controller with an mbed microcontroller.

```c++
{
    USAGE_PAGE(1),      0x01,       // Generic Desktop
    USAGE(1),           0x05,       // Gamepad
    COLLECTION(1),      0x01,       // Application
    COLLECTION(1),      0x00,       // Physical

    REPORT_COUNT(1),    0x06,       // 6 Buttons
    REPORT_SIZE(1),     0x01,       // 1 bit each
    USAGE_PAGE(1),      0x09,       // Buttons
    USAGE_MINIMUM(1),       0x01,   // Button #1 
    USAGE_MAXIMUM(1),       0x06,   // Button #6
    LOGICAL_MINIMUM(1),     0x00,   // Minimum = 0 
    LOGICAL_MAXIMUM(1),     0x01,   // Maximum = 1
    INPUT(1),           0x02,       // INPUT type TODO check this INPUT(data,var,abs)
    REPORT_COUNT(1),    0x01,       // Unused Bits for buttons
    REPORT_SIZE(1),     0x02,
    INPUT(1),           0x03,       // INPUT(Cnst,var,abs)

    REPORT_COUNT(1),    0x04,       // 4 Axies
    REPORT_SIZE(1),     0x08,       // 1 Byte Each 
    USAGE_PAGE(1),      0x01,       // Generic Desktop
    USAGE(1),           0x30,       // X
    USAGE(1),           0x31,       // Y
    USAGE(1),           0x32,       // Z
    USAGE(1),           0x33,       // Rx
    LOGICAL_MINIMUM(1),     0x81,   // Logical Minimum (-127)
    LOGICAL_MAXIMUM(1),     0x7f,   // Logical Maximum (127)
    INPUT(1),           0x02,       // Relative data INPUT(data,var,abs)

    END_COLLECTION(0),
    END_COLLECTION(0),
};
```

Designing the descriptor is a bit tricky since there isn't a whole lot of user friendly
documentation or tooling around it. The Best I was able to find was [HID Usage Tables](https://usb.org/sites/default/files/hut1_3_0.pdf)
which contains all of the different options for an HID descriptor and the [HID Descriptor Tool](https://www.usb.org/document-library/hid-descriptor-tool)
which can take you through series of questions to generate a descriptor. The Tool is a bit clunky but I was able to get it work
decently well.

## Workflow

Once you have defined the features of your HID and made a corresponding report descriptor you can start working on the implementation
of the HID specification. Every HID generally follows the same workflow. 

1. The device connects to the pc
2. The device communicates the format of its HID reports
3. The device and the pc communicate by constantly sharing reports
    1. The HID will communicate the status of its inputs
    2. The PC may or may not communicate back depending on the application interfacing with the HID

## References

- [HID Controller with an mbed microcontroller](https://github.com/VVoruganti/mbed-gamepad-drivers)
- [Custom HID Controller with a Teensy](https://blog.hamaluik.ca/posts/making-a-custom-teensy3-hid-joystick/)
- [Arduino SNES Controller](https://learn.adafruit.com/usb-snes-gamepad/introducing-the-teensy-with-hid) 

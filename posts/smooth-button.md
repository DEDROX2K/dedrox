# Smooth Button

``` html
      <a href="index.html">
        <div class="consubtn mx-auto text-center" style="letter-spacing: 0.1rem;">
          SEND ME A QUICK MESSAGE
        </div>
      </a>
```


#CODE



``` css
.consubtn {
    font-family: gnu;
    background-color: #f0f0f0;
    border: 0;
    color: #242424;
    border-radius: 300px;
    font-size: 4rem;
    padding: 2rem 1rem;
    font-weight: 600;
    width: 69%;
    margin-bottom: 16%;
    text-shadow: 0 0.0625em 0 #fff;


    box-shadow: inset 0 0.0625em 0 0 #f4f4f4, 0 0.0625em 0 0 #efefef,
        0 0.125em 0 0 #ececec, 0 0.25em 0 0 #e0e0e0, 0 0.3125em 0 0 #dedede,
        0 0.375em 0 0 #dcdcdc, 0 0.425em 0 0 #cacaca, 0 0.425em 0.5em 0 #c5c5c5;
    transition: 0.25s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: url('linkcursor.png'), pointer;
    &:active,

    &:hover {
        transform: translateY(0.225em);
        box-shadow: inset 0 0.03em 0 0 #f4f4f4, 0 0.03em 0 0 #efefef,
            0 0.0625em 0 0 #ececec, 0 0.125em 0 0 #e0e0e0, 0 0.125em 0 0 #dedede,
            0 0.2em 0 0 #dcdcdc, 0 0.225em 0 0 #cacaca, 0 0.225em 0.375em 0 #cecece;
        width: 72%;

        &:after {
            height: calc(100% + 0.225em);
            width: 60%;
        }
    }

  

    &:after {
        content: "";
        height: calc(100% + 0.375em);
        transition: height 0.25s ease;
        width: 60%;
    }
}
```


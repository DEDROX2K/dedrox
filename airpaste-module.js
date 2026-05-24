        import gsap from 'https://esm.sh/gsap@3.13.0'
        import Draggable from 'https://esm.sh/gsap@3.13.0/Draggable'
        import { Pane } from 'https://esm.sh/tweakpane@4.0.4'
        gsap.registerPlugin(Draggable)

        const config = {
            theme: 'dark',
            hue: 33,
            duration: 10,
            bglight: 0.1,
            scale: 1.1,
            style: 'track',
            text: 'Only for WINDOWS 10 and above',
        }

        const board = document.querySelector('.board')
        const textTrack = board ? board.querySelector('.text-track') : null

        const ctrl = new Pane({
            title: 'config',
            expanded: true,
        })
        let textCtrl
        const update = () => {
            document.documentElement.dataset.theme = config.theme
            document.documentElement.style.setProperty('--hue', config.hue)
            document.documentElement.style.setProperty('--duration', config.duration)
            document.documentElement.style.setProperty('--bg-lightness', config.bglight)
            document.documentElement.style.setProperty('--scale', config.scale)
            if (textCtrl) textCtrl.hidden = config.style !== 'track'
        }

        const sync = (event) => {
            if (
                !document.startViewTransition ||
                event.target.controller.view.labelElement.innerText !== 'theme'
            )
                return update()
            document.startViewTransition(() => update())
        }

        ctrl.addBinding(config, 'style', {
            label: 'style',
            options: {
                countdown: 'countdown',
                track: 'track',
                video: 'video',
            },
        })

        ctrl.addBinding(config, 'bglight', {
            label: 'bg-light',
            min: 0,
            max: 1,
            step: 0.01,
        })

        textCtrl = ctrl.addBinding(config, 'text', {
            label: 'text',
            hidden: config.style !== 'track',
        }).on('change', () => {
            if (textTrack) {
                textTrack.innerHTML = `<div class="text">${config.text}</div><div class="text text--clone">${config.text}</div>`
            }
        })

        ctrl.addBinding(config, 'hue', {
            label: 'hue',
            min: 0,
            max: 359,
            step: 1,
        })

        ctrl.addBinding(config, 'scale', {
            label: 'scale',
            min: 0.5,
            max: 1.5,
            step: 0.1,
        })

        ctrl.addBinding(config, 'duration', {
            label: 'duration(s)',
            min: 0.2,
            max: 10,
            step: 0.01,
        })

        ctrl.addBinding(config, 'theme', {
            label: 'theme',
            options: {
                system: 'system',
                light: 'light',
                dark: 'dark',
            },
        })

        ctrl.on('change', sync)
        if (textTrack) {
            textTrack.innerHTML = `<div class="text">${config.text}</div><div class="text text--clone">${config.text}</div>`
        }
        update()

        // make tweakpane panel draggable
        const tweakClass = 'div.tp-dfwv'
        setTimeout(() => {
            const d = Draggable.create(tweakClass, {
                type: 'x,y',
                allowEventDefault: true,
                trigger: tweakClass + ' button.tp-rotv_b',
            })
            const el = document.querySelector(tweakClass);
            if (el) {
                el.addEventListener('dblclick', () => {
                    gsap.to(tweakClass, {
                        x: `+=${d[0].x * -1}`,
                        y: `+=${d[0].y * -1}`,
                        onComplete: () => {
                            gsap.set(tweakClass, { clearProps: 'all' })
                        },
                    })
                })
            }
        }, 100);

(() => {
      const application = Stimulus.Application.start()

      application.register("favourites", class extends Stimulus.Controller {
        static get targets() {
          return [ "name" ]
        }

        // …
      })
    })()

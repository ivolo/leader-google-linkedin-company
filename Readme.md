
# leader-google-linkedin-company

  A [leader](https://github.com/ivolo/leader) plugin for  googling domain names to guess at LinkedIn company urls.

## Example

```js
var Leader = require('leader');
var guess = require('leader-google-linkedin-company');

var leader = Leader()
  .use(guess())
  .populate({ email: 'ilya@segment.io', function(err, person) {
    // ..
});
```

And adds the `company.linkedin.url` object to the `person`:

```js
{
    email: 'ilya@segment.io',
    // ..
    company: {
      linkedin: {
        url: 'https://linkedin.com/company/segment-io'
      }
    }
}
```

## API

#### plugin()

  Return a domain googling plugin.

# bradfordwagner.ansible-role-azure-blob-cli

## Updating the version

Version is controlled by `abc_ver` in `defaults/main.yml`.

Check for the latest release at: https://github.com/bradfordwagner/go-azure-blob-cli/releases

```yaml
abc_ver: X.Y.Z
```

After bumping the version, add a new checksums entry to `abc_checksums` in `defaults/main.yml`.
Download the checksums file from:

```
https://github.com/bradfordwagner/go-azure-blob-cli/releases/download/X.Y.Z/checksums.txt
```

The `dl-checksums.sh` script automates generating the YAML block for a given version.

Note: releases v1.2.0+ use lowercase platform names (`linux_amd64`, `darwin_arm64`, etc.).
Also update `test.yml` to set `abc_ver` to the new version.

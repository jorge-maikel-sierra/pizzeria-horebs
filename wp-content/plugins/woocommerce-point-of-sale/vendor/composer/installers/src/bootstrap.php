<?php

use Composer\Autoload\ClassLoader;

function includeIfExists(string $file): ?ClassLoader
{
    if (file_exists($file)) {
        return include $file;
    }

    return null;
}
return $loader;

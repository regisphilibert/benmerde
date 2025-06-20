#!/bin/bash
DIR=${PWD}

HUGO_TYPE='extended'
# Check for positional parameter, if found we assume it's the intended version
if [ ! $1 ]; then
#Required to be SET. TODO: Test for this, and if version is not present load from present. Use something like https://zwbetz.com/script-to-install-latest-hugo-release-on-linux-and-mac/
    HUGO_VERSION=$(node -p "require('./package.json').hugo.version")
    HUGO_TYPE=$(node -p "require('./package.json').hugo.extended")
else
    HUGO_VERSION=$1
fi

FILE=hugo_${HUGO_VERSION}

set -e

if [ $HUGO_VERSION != 'undefined' ]; then
    echo Installing $HUGO_VERSION
else
    echo Missing Hugo Version
    exit
fi

#
if [ $HUGO_TYPE != false ] || [ $HUGO_TYPE != "false" ]; then
    echo WE ARE Using Hugo Extended
    EXTENDED="extended_"
else
    echo NOT Using Hugo Extended
    EXTENDED=""
fi

echo Cleaning bin directory

if [ -d ${PWD}/bin ]; then
    rm -rf ${PWD}/bin
fi

echo Make temp directory

mkdir -p ${PWD}/temp ${PWD}/bin

echo Move to temp directory

pushd ${PWD}/temp

echo Current Directory: ${PWD}

curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${EXTENDED}${HUGO_VERSION}_darwin-universal.tar.gz -o ${FILE}.tar.gz

TARBALL=${FILE}.tar.gz

echo Extracting $TARBALL

tar --extract --file $TARBALL

# do we need sudo command for these?
chmod +x hugo

mv hugo $DIR/bin/${FILE}

# Clean up temp directory (popd) ?
rm -rf $DIR/temp

location="$(which $DIR/bin/${FILE})"
echo "Hugo binary location: $location"

version="$($DIR/bin/${FILE} version)"
echo $version
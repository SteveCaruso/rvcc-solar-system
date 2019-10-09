## Did some cleanup, which includes:

 - Removed the duplicate repository from the root of the project - it's been there forever, I assume by accident
 
 - Removed duplicate files (mostly images), and files that weren't actually used anywhere in the project
 
 - Ran pngcrush on most of the significantly-sized images, which shrank files by an average of probably 3% - which actually isn't all that great, but there were like a hundred megabytes of images so it's better than nothing. (I left the pngcrush executable in the Student Content folder in case you want to do more.)
 
 - Some of Luther's PSDs still had the empty background layer in them, even though they were entirely occluded by the stuff in the actual PSDs, which I removed; my version of Photoshop is super old so there might be compatibility issues but they should still work
 
 - Zipped the Timeline folder in Student Content; you could zip the rest of the folder too, but the bulk of the rest of the stuff in it are PNGs which are basically zip files anyway so it won't do much

## More

 - The software is intended to work on a 1920x1080 screen, but a lot of the Solar System images - namely, the Sun - are much, much bigger than this. I didn't want to do anything that would destroy visual information in the images but scaling these images down would obviously reduce the sizes by a lot.
 
## I tested everything and nothing seems to be broken.
 
 - Although the last three Timeline screens do not appear to be implemented; I found them like this, so I don't know if you have a more up-to-date version of the repository somewhere else, which would probably make merging the changes to be somewhat more difficult
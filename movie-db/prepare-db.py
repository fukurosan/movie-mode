#!/usr/bin/env python3

import urllib.request
import zlib
import os

base_url = "https://datasets.imdbws.com/"


def download(compressed_file_name):
    url = base_url + compressed_file_name
    decompressed_file_name = compressed_file_name[:-3]
    fixed_file_name = decompressed_file_name[:-4] + ".fixed.tsv"

    print('Downloading IMDB Archieve File From: {}'.format(url))
    urllib.request.urlretrieve(url, compressed_file_name)

    print("Decompressing...")
    CHUNKSIZE = 1024
    decompressor = zlib.decompressobj(16+zlib.MAX_WBITS)
    with open(compressed_file_name, 'rb') as compressed_file:
        buffer = compressed_file.read(CHUNKSIZE)
        with open(decompressed_file_name, "wb") as decompressed_file:
            while buffer:
                out_bytes = decompressor.decompress(buffer)
                decompressed_file.write(out_bytes)
                buffer = compressed_file.read(CHUNKSIZE)
    os.remove(compressed_file_name)

    print("Removing Headers...")
    with open(decompressed_file_name, "r", encoding="utf-8") as in_file:
        with open(fixed_file_name, "w", encoding="utf-8") as out_file:
            for index, line in enumerate(in_file):
                if index != 0:
                    out_file.write(line)
    os.remove(decompressed_file_name)

    return


if __name__ == "__main__":
    download("name.basics.tsv.gz")
    download("title.akas.tsv.gz")
    download("title.basics.tsv.gz")
    download("title.crew.tsv.gz")
    download("title.episode.tsv.gz")
    download("title.principals.tsv.gz")
    download("title.ratings.tsv.gz")
    print("All Operations Completed.")
#!/bin/bash

# Check if the image name is provided as an argument
if [ $# -eq 0 ]; then
    echo "Please provide the Docker image name as an argument."
    exit 1
fi

# Get the Docker image name from the command-line argument
image_name=$1

# Get the list of all tags for the image
tags=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep "^${image_name}" | sort)

# Count the number of tags
tag_count=$(echo "$tags" | wc -l)

# Check if there are more than 3 tags
if [ $tag_count -gt 3 ]; then
    # Calculate the number of tags to delete
    tags_to_delete=$((tag_count - 3))

    # Get the tags to delete
    tags_to_delete_list=$(echo "$tags" | head -n $tags_to_delete)

    # Delete each tag
    while IFS= read -r tag_to_delete; do
        docker rmi "$tag_to_delete"
    done <<< "$tags_to_delete_list"
else
    echo "There are no more than 3 tags for the Docker image."
fi

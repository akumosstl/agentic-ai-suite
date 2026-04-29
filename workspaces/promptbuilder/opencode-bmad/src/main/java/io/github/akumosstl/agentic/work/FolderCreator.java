package io.github.akumosstl.agentic.work;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FolderCreator {

    /**
     * Creates a new folder within the user's home directory.
     *
     * @param folderName The name of the folder to create.
     * @return true if the directory was created successfully or already exists, false otherwise (though an exception
     *         is more likely for a definitive failure).
     * @throws IOException If an I/O error occurs (e.g., permissions issue, disk full).
     */
    public static boolean createFolderInUserHome(String folderName) throws IOException {
        // Get the path to the user's home directory
        String userHome = System.getProperty("user.home");

        // Combine the user's home path with the new folder name
        Path path = Paths.get(userHome, folderName);

        // Create the directory (and any necessary parent directories)
        // This method does not throw an exception if the directory already exists.
        if (!Files.exists(path)) {
            Files.createDirectories(path);
            System.out.println("Directory created at: " + path.toAbsolutePath());
            return true;
        } else {
            System.out.println("Directory already exists at: " + path.toAbsolutePath());
            return false;
        }
    }

}

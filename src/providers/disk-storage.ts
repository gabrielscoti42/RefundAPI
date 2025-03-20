import fs from "node:fs"
import path from "node:path"

import uploadConfig from "@/configs/upload"

class DiskStorage {
    async saveFile(file: string) {
        // pega o caminho do arquivo temporário
        const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
        // pega o caminho do arquivo de destino
        const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            // verifica se o arquivo temporário existe
            await fs.promises.access(tmpPath)
        } catch (error) {
            throw new Error(`Arquivo não encontrado ${tmpPath}`)
        }

        // verifica se a pasta de destino existe
        await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true})
        // move o arquivo temporário para o destino
        await fs.promises.rename(tmpPath, destPath)

        return file
    }

    async deleteFile(file: string, type: "tmp" | "uploads") {
        const pathFile = type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER

        const filePath = path.resolve(pathFile, file)

        try {
            await fs.promises.stat(filePath)
        } catch (error) {
            throw error
        }

        await fs.promises.unlink(filePath)
    }
}

export { DiskStorage}
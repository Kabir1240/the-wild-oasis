import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {  
  const { data, error } = await supabase.from('cabins').select('*')
  
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');
  
  // Create Cabin
  if (!id) query = query.insert([{ ...cabin, image: imagePath, }]);

  // Update Cabin. Notice how we're not placing the data in an array here.
  if (id) query = query.update({ ...cabin, image: imagePath, }).eq('id', id);

  const { data, error } = await query.select().single();

  
  if (error && id) {
    console.log(error);
    throw new Error("Cabin could not be updated")
  } else if (error) {
    console.log(error);
    throw new Error("Cabin could not be created")
  }

  if (hasImagePath) return data
  
  // Upload Image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabin.image)
  
  // If there is a storage error, delete the cabin
  if (storageError) {
    console.log(storageError);
    await deleteCabin(data[0].id)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  }

  return data;

}

export async function deleteCabin(id) {
  const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)
  
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted")
  }
}


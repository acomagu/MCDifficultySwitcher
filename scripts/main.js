import { world, Difficulty } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// Show menu to change difficulty
function showMenu(player) {
  const now = world.getDifficulty(); // Get current difficulty
  const form = new ActionFormData()
    .title("Choose Difficulty")
    .body(`Current: ${now}`)
    .button("Peaceful")
    .button("Easy")
    .button("Normal")
    .button("Hard");

  form.show(player).then(res => {
    if (res.canceled || res.selection === undefined) return;
    const map = [Difficulty.Peaceful, Difficulty.Easy, Difficulty.Normal, Difficulty.Hard];
    const next = map[res.selection];
    if (!next) return;
    world.setDifficulty(next); // Change difficulty (stable API)
    world.sendMessage(`§aDifficulty has been changed to ${next}`);
  });
}

// Show the menu when a paper named "Difficulty Menu" is used
world.afterEvents.itemUse.subscribe(e => {
  const item = e.itemStack;
  if (item?.typeId !== "minecraft:paper") return;
  if (item.nameTag !== "Difficulty Menu") return; // Rename this item with an anvil
  showMenu(e.source);
});


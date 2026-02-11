import dearpygui.dearpygui as dpg
import os

folder = "/storage/emulated/0"
images = [os.path.join(folder,f) for f in os.listdir(folder) if f.lower().endswith(('.jpg','.png'))]

dpg.create_context()
with dpg.window(label="Gallery", width=800, height=600):
    for img in images:
        dpg.add_image(img)  # يمكن التعامل مع thumbnails بسهولة

dpg.create_viewport(title='Gallery', width=800, height=600)
dpg.setup_dearpygui()
dpg.show_viewport()
dpg.start_dearpygui()
dpg.destroy_context()

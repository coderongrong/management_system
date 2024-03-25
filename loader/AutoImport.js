module.exports = (content, map, meta) => {
    content = content.replace(/<style scoped lang='less'>|<style lang='less' scoped>/, `<style scoped lang='less'>
        @import '@/assets/css/index.less';
        @import '@/assets/css/main.less';
    `)
    return content
}